import React, {useState, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Form.css';
import {useSelector} from 'react-redux';
import * as selectors from '../../app/selectors';

const FormPage1Part2 = ({formData, setFormData}) => {

    const data = useSelector(selectors.selectors)

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedHousing, setSelectedHousing] = useState(null);
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);
    const [selectedCohabitation, setSelectedCohabitation] = useState(null);

    const [municipalityOptions, setMunicipalityOptions] = useState([]);
    const [selectedNationalities, setSelectedNationalities] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleProvinceChange = (event, value) => {
        if (value) {
            setFormData({...formData, province: value.id});
            setSelectedProvince(data.provinces.find((province) => province.id === value.id));
        } else {
            setFormData({...formData, province: null});
            setSelectedProvince(null);
        }
    };

    const handleMunicipalityChange = (event, value) => {
        if (value) {
            setFormData({...formData, municipality: value.id});
            setSelectedMunicipality(data.municipalities.find((municipality) => municipality.id === value.id))
        } else {
            setFormData({...formData, municipality: null});
            setSelectedMunicipality(null);
        }
    };

    const handleCountryChange = (event, value) => {
        if (value) {
            setFormData({...formData, country: value.id});
            setSelectedCountry(data.countries.find((m) => m.id === value.id))
        } else {
            setFormData({...formData, country: null});
            setSelectedCountry(null)
        }
    };

    const handleHousingChange = (event, value) => {
        if (value) {
            setFormData({...formData, housing: value.id});
            setSelectedHousing(data.housings.find((m) => m.id === value.id));
        } else {
            setFormData({...formData, housing: null});
            setSelectedHousing(null)
        }
    };
    const handleCohabitationChange = (event, value) => {
        if (value) {
            setFormData({...formData, cohabitation: value.id});
            setSelectedCohabitation(data.cohabitations.find((m) => m.id === value.id))
        } else {
            setFormData({...formData, cohabitation: null});
            setSelectedCohabitation(null)
        }
    };
    const handleMaritalStatusChange = (event, value) => {
        if (value) {
            setFormData({...formData, maritalStatus: value.id});
            setSelectedMaritalStatus(data.maritalStatus.find((m) => m.id === value.id))
        } else {
            setFormData({...formData, maritalStatus: null});
            setSelectedMaritalStatus(null)
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRegisteredChange = (e) => {
        if (isRegistered) {
            setFormData({...formData, dateRegister: '', numberRegistered: '', registered: false});
            setIsRegistered(false);
        } else {
            setIsRegistered(true);
            setFormData({...formData, registered: true});
        }
    };

    const handleNationalitiesChange = (event, values) => {
        const nationalityIds = values.map((value) => value.id);
        setFormData({...formData, nationalities: nationalityIds});
        setSelectedNationalities(values);
    };

    useEffect(() => {
        if (data) {
            const filteredMunicipalities = selectedProvince
                ? data.municipalities.filter((municipality) => municipality.province.id === selectedProvince.id)
                : [];
            setMunicipalityOptions(filteredMunicipalities);

            setFormData({...formData, province: selectedProvince ? selectedProvince.id : null});
        }
        // eslint-disable-next-line
    }, [selectedProvince, setFormData, data]);

    useEffect(() => {
        if (data && formData.nationalities.length > 0) {
            const selected = formData.nationalities.map((countryId) =>
                data.countries.find((country) => country.id === countryId)
            );
            setSelectedNationalities(selected);
        }
    }, [formData.nationalities, data, setSelectedNationalities]);

    useEffect(() => {
        if (data) {
            setSelectedProvince(data.provinces.find((province) => province.id === formData.province) || null);
            setSelectedMunicipality(data.municipalities.find((municipality) => municipality.id === formData.municipality) || null);
            setSelectedCountry(data.countries.find((m) => m.id === formData.country) || null);
            setSelectedHousing(data.housings.find((m) => m.id === formData.housing) || null);
            setSelectedMaritalStatus(data.maritalStatus.find((m) => m.id === formData.maritalStatus) || null);
            setSelectedCohabitation(data.cohabitations.find((m) => m.id === formData.cohabitation) || null);
            setIsRegistered(formData.registered || false);
        }
    }, [data])

    if (!data)
        return null;

    return (
        <div>
            <div className="row-container">
                <Autocomplete
                    className="item"
                    options={data.provinces}
                    getOptionLabel={(option) => option.name}
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Provincia" placeholder="Provincia"/>
                    )}
                    required
                />
                <Autocomplete
                    className="item"
                    options={municipalityOptions}
                    getOptionLabel={(option) => option.name}
                    value={selectedMunicipality}
                    onChange={handleMunicipalityChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Municipio" placeholder="Municipio"/>
                    )}
                    disabled={!selectedProvince}
                    required
                />
            </div>
            <div className="row-container">
                <TextField
                    className="item"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="Domicilio"
                    placeholder="Domicilio"
                    required
                />

                <TextField
                    className="item"
                    name="postalAddress"
                    value={formData.postalAddress}
                    onChange={handleChange}
                    label="Código Postal"
                    placeholder="Código Postal"
                />


                <TextField className="item"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           label="Teléfono/s"
                           placeholder="Teléfono"
                           required
                />
            </div>
            <div className="row-container">
                <Autocomplete
                    className="item"
                    options={data.countries}
                    getOptionLabel={(option) => option.name}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    renderInput={(params) => (
                        <TextField {...params} label="País de origen" placeholder="País de origen"/>
                    )}
                    required
                />

                <Autocomplete
                    className="item2"
                    multiple
                    options={data.countries}
                    getOptionLabel={(option) => option.name}
                    value={selectedNationalities}
                    onChange={handleNationalitiesChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Nacionalidades" placeholder="Nacionalidades"/>
                    )}
                    required
                />
            </div>
            <div className="row-container">
                <FormControlLabel
                    control={
                        <Checkbox
                            name="registered"
                            checked={isRegistered}
                            onChange={handleRegisteredChange}
                        />
                    }
                    label="Empadronado"
                />
                <TextField
                    disabled={!isRegistered}
                    className="item"
                    type="date"
                    name="dateRegister"
                    value={formData.dateRegister}
                    onChange={handleChange}
                    label="Fecha de Empadronamiento"
                    placeholder="Fecha de Empadronamiento"
                    InputLabelProps={{shrink: true}}
                />

                <TextField
                    className="item"
                    disabled={!isRegistered}
                    type={"number"}
                    name="numberRegistered"
                    value={formData.numberRegistered}
                    onChange={handleChange}
                    label="Número de personas empadronadas"
                    placeholder="Número de personas empadronadas"
                />
            </div>
            <div className="row-container">
                <Autocomplete
                    className="item"
                    options={data.housings}
                    getOptionLabel={(option) => option.name}
                    value={selectedHousing}
                    onChange={handleHousingChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Vivienda" placeholder="Seleccionar vivienda"/>
                    )}
                />
                <Autocomplete
                    className="item"
                    required
                    options={data.maritalStatus}
                    getOptionLabel={(option) => option.name}
                    value={selectedMaritalStatus}
                    onChange={handleMaritalStatusChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Estado civil" placeholder="Seleccionar estado civil"/>
                    )}
                />
                <Autocomplete
                    className="item"
                    required
                    options={data.cohabitations}
                    getOptionLabel={(option) => option.name}
                    value={selectedCohabitation}
                    onChange={handleCohabitationChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo de convivencia" placeholder="Tipo de convivencia"/>
                    )}
                />
            </div>
        </div>
    );

}
export default FormPage1Part2;