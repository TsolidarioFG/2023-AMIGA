import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

const DocuPDF = ({formData, selectors}) => {

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const styles = StyleSheet.create({
        image: {
            width: '25%',
            marginHorizontal: 15,
        },
        title: {
            alignContent: 'center',
            fontSize: 24,
            backgroundColor: 'grey',
            padding: '4mm',
        },
        title2: {
            alignContent: 'center',
            fontSize: 14,
            backgroundColor: 'grey',
            padding: '2mm',
            margin: 15
        },
        textT: {
            margin: 5,
            fontSize: 10,
            fontFamily: 'Oswald'
        },
        text: {
            margin: 1,
            fontSize: 9,
        },
        smallText: {
            margin: 1,
            fontSize: 7,
        },
        space: {
            paddingHorizontal: 25
        },
        nextLine: {
            width: '100%'
        },
        page: {
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 15,
        },
        viewHeader: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: "center",
            padding: 10,
        },
        body: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        leftColumn: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '54%',
            alignItems: 'center',
        },
        rightColumn: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '45%',
            alignItems: 'center',
        },
        Box: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
            border: '0.5mm',
            margin: 3,
            alignItems: "center",
        },
        BoxNoBorder: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            width: '100%',
            alignItems: "center",
        },
        FitBox: {
            display: 'flex',
            flexDirection: 'row',
            border: '1mm',
            alignItems: "center",
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    });

    return (
        <Document>
            <Page
                size="A4"
                orientation="landscape"
                style={styles.page}
            >
                <View style={styles.viewHeader}>
                    <View style={styles.FitBox}>
                        <Text style={styles.textT}>Fecha:</Text>
                        <Text style={styles.text}>{formData.date.split("-").reverse().join("-")}</Text>
                    </View>
                    <Text style={styles.title}>Ficha de acogida</Text>
                    <Image style={styles.image} src={process.env.PUBLIC_URL + '/logopng.png'} />

                </View>
                <View style={styles.body}>
                    <View style={styles.leftColumn}>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> NOMBRE Y APELLIDOS:</Text>
                            <Text style={styles.text}>{formData.name + " " + formData.surnames}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}>FEC. DE NACIMIENTO:</Text>

                            <Text style={styles.text}>{formData.birthDate ? formData.birthDate.split("-").reverse().join("-") : ''}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}>SEXO:</Text>
                            <Text style={styles.text}>{formData.sex}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> DOMICILIO:</Text>
                            <Text style={styles.text}>{formData.address}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> PROVINCIA: </Text>
                            <Text style={styles.text}>{selectors.province}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> MUNICIPIO: </Text>
                            <Text style={styles.text}>{selectors.municipalities}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> C.P.: </Text>
                            <Text style={styles.text}>{formData.postalAddress}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> TELÉFONO/S:</Text>
                            <Text style={styles.text}>{formData.phone}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> EMAIL: </Text>
                            <Text style={styles.text}>{formData.email}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> ESTADO CIVIL: </Text>
                            <Text style={styles.text}>{selectors.maritalStatus} </Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> FEC. NACIMIENTO Y SEXO MENORES: </Text>
                            <Text style={styles.text}>{selectors.kids}</Text>

                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> NIVEL DE ESTUDIOS:</Text>
                            <Text style={styles.text}>{selectors.studies}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> HOMOLOGADOS:</Text>
                            <Text style={styles.text}>Si</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> IDIOMAS: </Text>
                            <Text style={styles.text}>{selectors.languages}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> FORMACIÓN DEMANDADA: </Text>
                            <Text style={styles.text}>{formData.demandedStudies}</Text>
                        </View>

                        <View style={styles.Box}>
                            <Text style={styles.textT}> PERMISO DE CONDUCIR:</Text>
                            <Text style={styles.text}>{formData.drivingLicence ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> VÁLIDO EN ESPAÑA:</Text>
                            <Text style={styles.text}>{formData.valid ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> VEHÍCULO: </Text>
                            <Text style={styles.text}>{formData.vehicle ? 'SI' : 'NO'}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> E. RETORNADO:</Text>
                            <Text style={styles.text}>{formData.returned ? 'SI' : 'NO'}</Text>
                            <Text style={styles.nextLine}></Text>
                            {formData.datePi ?
                                <View style={styles.BoxNoBorder}>
                                    <Text style={styles.textT}> MANIFESTACIÓN PI: </Text>
                                    <Text style={styles.text}>{formData.datePi.split("-").reverse().join("-")}</Text>
                                    <Text style={styles.space}></Text>
                                    <Text style={styles.textT}> 1º ENTREVISTA PI:  </Text>
                                    <Text style={styles.text}>{formData.interviewPi ? formData.interviewPi.split("-").reverse().join("-") : 'NO'}</Text>
                                </View>
                                :
                                <Text style={styles.textT}> PROT. INTERN.:  NO</Text>
                            }

                        </View>
                    </View>


                    <View style={styles.rightColumn}>
                        <View style={styles.Box}>
                            <Text style={styles.textT}>DNI: </Text>
                            <Text style={styles.text}>{formData.dni ? formData.dni : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}>NIE: </Text>
                            <Text style={styles.text}>{formData.nie ? formData.nie : 'NO'}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>PAS: </Text>
                            <Text style={styles.text}>{formData.pas ? formData.pas : 'NO'}</Text>
                        </View>

                        <View style={styles.Box}>
                            <Text style={styles.textT}> SITUACIÓN ADMINISTRATIVA: </Text>
                            <Text style={styles.text}>{formData.situation}</Text>
                        </View>


                        <View style={styles.Box}>
                            <Text style={styles.textT}>PAÍS DE ORIGEN:</Text>
                            <Text style={styles.text}>{selectors.countries}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>NACIONALIDAD/ES:</Text>
                            <Text style={styles.text}>{selectors.nationalities}</Text>

                        </View>
                        <View style={styles.Box}>
                            <Text style={styles.textT}> EMPADRONADO/A: </Text>
                            <Text style={styles.text}>{formData.registered ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> FECHA: </Text>
                            <Text style={styles.text}>{formData.dateRegister ? formData.dateRegister.split("-").reverse().join("-") : 'NO'} </Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> Nº PERSONAS EMPADRONADAS: </Text>
                            <Text style={styles.text}>{formData.numberRegistered}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> TIPO DE VIVIENDA: </Text>
                            <Text style={styles.text}>{selectors.housings}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>TIPO DE CONVIVENCIA:</Text>
                            <Text style={styles.text}>{selectors.cohabitation}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>FACTORES EXCLUSIÓN: </Text>
                            <Text style={styles.text}>{selectors.factors}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>TRABAJADOR/A SOCIAL:</Text>
                            <Text style={styles.text}>{formData.socialWorker ? formData.socialWorker : 'NO'}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}>COBERTURA SANITARIA:</Text>
                            <Text style={styles.text}>{formData.healthCoverage ? formData.healthCoverage : 'NO'}</Text>
                        </View>

                        <View style={styles.Box}>
                            <Text style={styles.textT}> HOGAR SIN EMPLEO:</Text>
                            <Text style={styles.text}>{formData.unemployedHousehold ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> HOGAR 1 ADULTO:</Text>
                            <Text style={styles.text}>{formData.oneAdultHousehold ? 'SI' : 'NO'}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> DEPENDIENTES A CARGO: </Text>
                            <Text style={styles.text}>{formData.dependants ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> DISCAPACIDAD: </Text>
                            <Text style={styles.text}>{formData.disability}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> INSCRITO/A SEPE: </Text>
                            <Text style={styles.text}>{formData.sepe ? 'SI' : 'NO'}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> TIEMPO DESEMPLEO: </Text>
                            <Text style={styles.text}>{formData.monthsSepe}</Text>
                            <Text style={styles.nextLine}></Text>
                            <Text style={styles.textT}> PRESTACIÓN: </Text>
                            <Text style={styles.text}>{formData.benefit}</Text>
                            <Text style={styles.space}></Text>
                            <Text style={styles.textT}> FECHA PRESTACIÓN: </Text>
                            <Text style={styles.text}>{formData.dateBenefit ? formData.dateBenefit.split("-").reverse().join("-") : 'NO'}</Text>
                            { formData.benefit === 'OTRA' &&
                                <View style={styles.BoxNoBorder}>
                                    <Text style={styles.nextLine}></Text>
                                    <Text style={styles.textT}> OTRA PRESTACIÓN: </Text>
                                    <Text style={styles.text}>{formData.specialBenefit}</Text>
                                </View>
                            }
                        </View>
                    </View>

                    <View style={styles.Box} break>
                        <Text style={styles.textT}> SITUACIÓN LABORAL: </Text>
                        <Text style={styles.text}> {selectors.studies}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> CUALIFICACIÓN PROFESIONAL:  </Text>
                        <Text style={styles.text}> {formData.qualification}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> EXPERIENCIA PROFESIONAL EN PAÍS DE ORIGEN:  </Text>
                        <Text style={styles.text}> {formData.profExpOrigin}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> EXPERIENCIA PROFESIONAL EN ESPAÑA:  </Text>
                        <Text style={styles.text}> {formData.profExpSpain}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> HABILIDADES Y LIMITACIONES:  </Text>
                        <Text style={styles.text}> {formData.skills}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> HORARIO DISPONIBLE:  </Text>
                        <Text style={styles.text}> {formData.availableHours}</Text>
                    </View>

                    <View style={styles.Box}>
                        <Text style={styles.textT}> TIPO DE DEMANDA ACTUAL: </Text>
                        <Text style={styles.text}>{selectors.demands}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> PROGRAMAS EN QUE PARTICIPA: </Text>
                        <Text style={styles.text}>{selectors.programs}</Text>
                        <Text style={styles.nextLine}></Text>
                        <Text style={styles.textT}> DERIVACIÓN: </Text>
                        <Text style={styles.text}>{formData.derivation}</Text>
                        <Text style={styles.nextLine}></Text>
                    </View>

                    <Text style={styles.title2} >Protección de datos</Text>
                    <Text style={styles.smallText}>{'\n'}FINALIDAD DEL TRATAMIENTO. En cumplimiento del artículo 13 del Reglamento (UE) 2016/679 de Protección de Datos, le informamos de que sus datos de carácter personal serán tratados con la
                        finalidad de gestionar los servicios ofrecidos por la asociación. {'\n'}{'\n'}</Text>
                    <Text style={styles.smallText}>BASE LEGAL. En cumplimiento del artículo 6 del Reglamento (UE) 2016/679 ASOCIACIÓN DE MIGRANTES DE GALICIA-AMIGA le solicita su consentimiento para el tratamiento de sus datos personales
                        informándole que dicho tratamiento tiene su base en su solicitud de alta como usuario de la asociación. {'\n'}{'\n'}</Text>
                    <Text style={styles.smallText}>CESIONES DE DATOS. Los datos no serán cedidos a terceros salvo que exista una obligación legal.{'\n'}{'\n'}</Text>
                    <Text style={styles.smallText}>PERIODO DE CONSERVACIÓN DE LOS DATOS. Los datos proporcionados se conservarán mientras se mantenga de alta como usuario de la asociación o durante los plazos legalmente establecidos.{'\n'}{'\n'}</Text>
                    <Text style={styles.smallText}>EJERCICIO DE DERECHOS. Podrá ejercer sus derechos de acceso, rectificación, supresión y portabilidad de datos y oposición y limitación a su tratamiento mediante escrito dirigido a ASOCIACIÓN DE
                        MIGRANTES DE GALICIA-AMIGA. Casa das Asociacións do Benestar Social (CABES) Rúa Manuel María, 6, Planta 3ª Oficina 5, 15705 Santiago de Compostela acompañando fotocopia de DNI o en su
                        defecto documento que acredite su debida identidad o bien con carácter previo a tal actuación solicitar con las mismas señas que le sean remitidos los impresos que el responsable del tratamiento
                        dispone a tal efecto.{'\n'}{'\n'}</Text>
                    <Text style={styles.smallText}>DERECHO A RECLAMAR. Si considera que no ha obtenido satisfacción plena en el ejercicio de sus derechos, podrá presentar una reclamación ante la autoridad nacional de control dirigiéndose a estos
                        efectos a la Agencia Española de Protección de Datos, C/ Jorge Juan, 6 – 28001 Madrid.{'\n'}{'\n'}{'\n'}{'\n'}</Text>

                    <View
                        style={{
                            width: 10,
                            height: 10,
                            borderWidth: 1,
                            borderColor: 'black',
                            marginRight: 5,
                        }}
                    ></View>
                    <Text style={styles.nextLine}></Text>
                    <Text style={styles.smallText}>Autorizo al ASOCIACIÓN DE MIGRANTES DE GALICIA-AMIGA al envío de comunicaciones vía e-mail y/o WhatsApp</Text>
                    <Text style={styles.nextLine}></Text>
                    <Text style={styles.textT}>{'\n'}{'\n'}FIRMA    _______________________________</Text>

                </View>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );

};

export default DocuPDF;