package es.udc.paproject.backend.model.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surnames;
    private String dni;
    private String nie;
    private String pas;
    private String phone;
    private String email;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private LocalDate birthDate;
    private LocalDate datePi;
    private LocalDate interviewPi;
    @OneToMany(mappedBy = "participant")
    private List<Kid> kids;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @ElementCollection
    private List<Integer> yearList = new ArrayList<>();

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNie() {
        return nie;
    }

    public void setNie(String nie) {
        this.nie = nie;
    }

    public String getPas() {
        return pas;
    }

    public void setPas(String pas) {
        this.pas = pas;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public List<Kid> getKids() {
        return kids;
    }

    public void setKids(List<Kid> kids) {
        this.kids = kids;
    }

    public LocalDate getDatePi() {
        return datePi;
    }

    public void setDatePi(LocalDate datePi) {
        this.datePi = datePi;
    }

    public LocalDate getInterviewPi() {
        return interviewPi;
    }

    public void setInterviewPi(LocalDate interviewPi) {
        this.interviewPi = interviewPi;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public List<Integer> getYearList() {
        return yearList;
    }

    public void setYearList(List<Integer> yearList) {
        this.yearList = yearList;
    }

    public void addYear(int year){
        this.yearList.add(year);
    }
}
