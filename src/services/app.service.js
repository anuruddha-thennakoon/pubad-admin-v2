import axios from 'axios';
import api from '../utils/api';

class AppService {

    addOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ADD_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getAllOfficers() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.ALL_OFFICERS)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    addInstitute(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ADD_INSTITUE, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getAllInstitutes() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.ALL_INSTITUES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getInstitutes() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.INSTITUES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getInstituteTypes() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.INSTITUE_TYPES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getCabinetMinistries() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.CABINET_MINISTRIES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    searchOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.SEARCH_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    searchOfficerById(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.SEARCH_OFFICER_BY_ID, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    attachOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ATTACH_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getDesignations() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.DESIGNATIONS)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getGrades() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.GRADES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    addCadrePosition(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ADD_CADRE_POSITION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    designationByIId(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.DESIGNATIONS_BY_IID, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    addDesignation(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ADD_DESIGNATION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    editDesignation(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.EDIT_DESIGNATION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getDesignationVacancies(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.VACANCY_DESIGNATION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getCadrePositions(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.CADRE_POSITION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getGradeVacancies() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.VACANCY_GRADES)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getGradeVacanciesCount() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.VACANCY_GRADES_COUNT)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    retireOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.RETIRE_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getGradeVacanyDetails(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.GRADE_VACANY_DETAILS, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    addApplication(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.ADD_APPLICATION, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error))
        });
    }

    getActInDetails(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.GET_ACTIN_APPLICATIONS, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    updateApplicationStatus(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.UPDATE_APPLICATIONS_STATUS, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error))
        });
    }

    uploadFile(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.FILE_UPLOAD, data)
                .then(result => {
                    if (result.data.sucess) {
                        resolve(result.data.fileName)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    uploadFiles(data) {
        const formData1 = new FormData();
        formData1.append('file', data.file);

        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.FILE_UPLOAD, formData1)
                .then(result => {
                    if (result.data.sucess) {
                        resolve({ "name": data.name, "url": result.data.fileName })
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    viewOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.VIEW_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error))
        });
    }

    updateOfficer(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.UPDATE_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error))
        });
    }

    getAllOfficersReport() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.ALL_OFFICERS_REPORT)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    viewOfficerSerivice(id) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.SERVICE_HISTORY(id))
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    getCurrentAllOfficers() {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .get(api.ALL_OFFICERS_CURRENT)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }

    createUserAccount(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.REG_OFFICER, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error))
        });
    }

    editCadre(data) {
        return new Promise((resolve, reject) => {
            axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
            axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
            axios
                .post(api.EDIT_CADRE, data)
                .then(result => {
                    if (result.data.success) {
                        resolve(result.data.data)
                    } else {
                        reject(result.data)
                    }
                })
                .catch(error => reject(error));
        });
    }
}

export default new AppService();
