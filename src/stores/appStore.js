import { observable, action } from 'mobx';
import appService from '../services/app.service';

class AppStore {

    @observable familyMembers = [];
    @observable serviceHistory = [];
    @observable educationalQualification = [];
    @observable professionalQualification = [];
    @observable publications = [];
    @observable subjectExpertise = [];
    @observable achievements = [];
    @observable lessons = [];
    @observable awards = [];

    @observable officers;
    @observable allOfficers;
    @observable officersReport;
    @observable institutes;
    @observable allinstitutes;
    @observable designations;
    @observable grades;
    @observable instituteTypes;
    @observable cabinetMinistries;
    @observable officerSearchData;
    @observable designationsIId;
    @observable vacancyDesignation;
    @observable cadrePositions;
    @observable gradeVacancies;
    @observable gradeVacanciesCount;
    @observable gradeVacanyDetails;
    @observable actInApplications;
    @observable officerDetails;
    @observable officerDetailsService;

    @observable officerData = {
        name: null,
        nic: null,
        gender: null,
        address: null,
        mobile: null,
        email: null,
        appointment_date: null,
        service_confirmed: null,
        dob: null,
        grade_iii_entry: null,
        grade_ii_promoted: null,
        grade_i_promoted: null,
        special_grade_promoted: null,
        al_stream: null,
        basic_degree: null,
        master_degree: null,
        service_history: []
    };

    @action resetOfficerData() {
        this.officerData.name = null;
        this.officerData.nic = null;
        this.officerData.gender = null;
        this.officerData.address = null;
        this.officerData.mobile = null;
        this.officerData.email = null;
        this.officerData.appointment_date = null;
        this.officerData.service_confirmed = null;
        this.officerData.dob = null;
        this.officerData.grade_iii_entry = null;
        this.officerData.grade_ii_promoted = null;
        this.officerData.grade_i_promoted = null;
        this.officerData.special_grade_promoted = null;
        this.officerData.al_stream = null;
        this.officerData.basic_degree = null;
        this.officerData.master_degree = null;
        this.officerData.service_history = [];
    }

    @action resetOfficer() {
        this.officerSearchData = null;
    }

    @action resetVacancyDesignation() {
        this.vacancyDesignation = null;
    }

    @action getAllOfficers() {

        return appService.getAllOfficers()
            .then((data) => {
                return this.officers = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action addOfficer(data) {

        return appService.addOfficer(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action addInstitute(data) {

        return appService.addInstitute(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getAllInstitutes() {

        return appService.getAllInstitutes()
            .then((data) => {
                return this.allinstitutes = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getInstitutes() {

        return appService.getInstitutes()
            .then((data) => {
                return this.institutes = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getInstituteTypes() {

        return appService.getInstituteTypes()
            .then((data) => {
                return this.instituteTypes = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getCabinetMinistries() {

        return appService.getCabinetMinistries()
            .then((data) => {
                return this.cabinetMinistries = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action searchOfficer(data) {

        return appService.searchOfficer(data)
            .then((data) => {
                return this.officerSearchData = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action attachOfficer(data) {

        return appService.attachOfficer(data)
            .then((data) => {
                return this.officerSearchData = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getDesignations() {

        return appService.getDesignations()
            .then((data) => {
                return this.designations = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getGrades() {

        return appService.getGrades()
            .then((data) => {
                return this.grades = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action addCadrePosition(data) {

        return appService.addCadrePosition(data)
            .then((data) => {
                return this.officerSearchData = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action searchOfficerById(data) {

        return appService.searchOfficerById(data)
            .then((data) => {
                return this.officerSearchData = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action designationByIId(data) {
        return appService.designationByIId(data)
            .then((data) => {
                return this.designationsIId = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action addDesignation(data) {
        return appService.addDesignation(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action editDesignation(data) {
        return appService.editDesignation(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getDesignationVacancies(data) {
        return appService.getDesignationVacancies(data)
            .then((data) => {
                return this.vacancyDesignation = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getCadrePositions(grade, institute, type) {
        this.cadrePositions = null;

        return appService.getCadrePositions()
            .then((data) => {

                if (grade == '' && institute == '' && type == '') {
                    return this.cadrePositions = data;

                } else if (grade != '' && institute == '' && type == '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.grade_name == grade) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                } else if (grade == '' && institute != '' && type == '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.name == institute) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                } else if (grade == '' && institute == '' && type != '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.institute_types_id == type) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                } else if (grade != '' && institute != '' && type == '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.grade_name == grade && element.name == institute) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                } else if (grade != '' && institute == '' && type != '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.grade_name == grade && element.institute_types_id == type) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                } else if (grade == '' && institute != '' && type != '') {
                    var temp = [];
                    data.forEach(element => {
                        if (element.name == institute && element.institute_types_id == type) {
                            temp.push(element);
                        }
                    });

                    return this.cadrePositions = temp;

                }

            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getGradeVacancies() {

        return appService.getGradeVacancies()
            .then((data) => {
                return this.gradeVacancies = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getGradeVacanciesCount() {

        return appService.getGradeVacanciesCount()
            .then((data) => {
                return this.gradeVacanciesCount = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action retireOfficer(data) {

        return appService.retireOfficer(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getGradeVacanyDetails(data) {

        return appService.getGradeVacanyDetails(data)
            .then((data) => {
                return this.gradeVacanyDetails = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action addApplication(data) {
        return appService.addApplication(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action getApplicationsCount(data) {
        return appService.getApplicationsCount(data)
            .then(data => {
                return this.actInApplications = data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action getApplications(data) {
        return appService.getApplications(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action approveApplication(data) {
        return appService.approveApplication(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action updateApplication(data) {
        return appService.updateApplication(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action uploadFile(data) {
        this.inProgress = true;
        this.errors = undefined;

        return appService.uploadFile(data)
            .then((res) => {
                return res;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action getAllUsers() {

        return appService.getAllUsers()
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action uploadFiles(data) {
        this.inProgress = true;
        this.errors = undefined;

        return new Promise((resolve, reject) => {
            let promises = [];
            let uploaded = [];
            let pindex = 0;

            for (let index = 0; index < data.length; index++) {
                if (data[index].file.uploaded) {
                    uploaded.push({ name: data[index].name, url: data[index].file.url });
                } else if (data[index].file) {
                    promises[pindex] = appService.uploadFiles(data[index]);
                    pindex++;
                }
            }

            Promise.all(promises)
                .then(res => {
                    if (uploaded.length !== 0) {
                        resolve(JSON.stringify(uploaded.concat(res)));
                    } else {
                        resolve(JSON.stringify(res));
                    }
                })
                .catch(err => {
                    reject(err);
                })

            // data.forEach(element => {
            //     promises.push({ "name": element.name, "url": 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' });
            // });
            // resolve(JSON.stringify(promises));
        });
    }

    @action viewOfficer(data) {
        return appService.viewOfficer(data)
            .then(data => {
                return this.officerDetails = data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action updateOfficer(data) {
        return appService.updateOfficer(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action getAllOfficersReport() {

        return appService.getAllOfficersReport()
            .then((data) => {
                return this.officersReport = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action viewOfficerSerivice(data) {
        return appService.viewOfficerSerivice(data)
            .then(data => {
                return this.officerDetailsService = data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action getCurrentAllOfficers() {

        return appService.getCurrentAllOfficers()
            .then((data) => {
                return this.allOfficers = data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action createUserAccount(data) {

        return appService.createUserAccount(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action editCadre(data) {
        return appService.editCadre(data)
            .then((data) => {
                return data;
            })
            .catch(action((err) => {
                throw err;
            }))
    }

    @action approveUser(data) {
        return appService.approveUser(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action getCadres(data) {
        return appService.getCadres(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action generateReports(data) {
        return appService.generateReports(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action submitApprovalDocument(data) {
        return appService.submitApprovalDocument(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }

    @action editInstitute(data) {
        return appService.editInstitute(data)
            .then(data => {
                return data;
            })
            .catch(action(err => {
                return err;
            }))
    }
}

export default new AppStore();
