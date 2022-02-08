class Api {

    VERSION = 'v1';
    APP_TOKEN = 'DX9343ZXS9JPK5c8ws5ct9G4u3720jTQ5lHwbGJH777GflSQX1';

    // BASE_URL = 'http://localhost:9494';
    BASE_URL = 'http://119.235.4.210:9494';

    URL = this.BASE_URL + '/api/' + this.VERSION + '/'

    LOGIN = this.URL + 'admin-login';

    ALL_OFFICERS = this.URL + 'get-officers';
    ALL_OFFICERS_CURRENT = this.URL + 'get-all-officers-current';
    ALL_OFFICERS_REPORT = this.URL + 'get-officers-report';
    ADD_OFFICER = this.URL + 'add-officer';
    ADD_INSTITUE = this.URL + 'add-institute';
    ALL_INSTITUES = this.URL + 'get-all-institutes';
    INSTITUES = this.URL + 'get-institutes';
    INSTITUE_TYPES = this.URL + 'get-institute-types';
    CABINET_MINISTRIES = this.URL + 'get-ministries';
    SEARCH_OFFICER = this.URL + 'search-officer';
    SEARCH_OFFICER_BY_ID = this.URL + 'search-officer-by-id';
    DESIGNATIONS_BY_IID = this.URL + 'search-designation-by-iid';
    ATTACH_OFFICER = this.URL + 'attach-officer';
    DESIGNATIONS = this.URL + 'get-designations';
    GRADES = this.URL + 'get-grades';
    ADD_CADRE_POSITION = this.URL + 'add-cadre-position';
    ADD_DESIGNATION = this.URL + 'add-designation';
    EDIT_DESIGNATION = this.URL + 'edit-designation';
    VACANCY_DESIGNATION = this.URL + 'designation-vacancies';
    CADRE_POSITION = this.URL + 'cadre-positions';
    VACANCY_GRADES = this.URL + 'grade-vacancies';
    VACANCY_GRADES_COUNT = this.URL + 'grade-vacancies-count';
    RETIRE_OFFICER = this.URL + 'retire-officer';
    GRADE_VACANY_DETAILS = this.URL + 'grade-vacancies-details';
    ADD_APPLICATION = this.URL + 'add-application';
    GET_APPLICATIONS_COUNT = this.URL + 'get-applications-count';
    GET_APPLICATIONS = this.URL + 'get-applications';
    APPROVE_APPLICATION = this.URL + 'approve-application';
    UPDATE_APPLICATION = this.URL + 'update-application';
    FILE_UPLOAD = this.URL + 'upload';
    VIEW_OFFICER = this.URL + 'view-officer';
    UPDATE_OFFICER = this.URL + 'update-officer';
    REG_OFFICER = this.URL + 'register-officer';
    EDIT_CADRE = this.URL + 'edit-cadre';
    ALL_USERS = this.URL + 'all-users';
    APPROVE_USER = this.URL + 'approve-user';
    GET_CADRES = this.URL + 'cadres';
    GENERATE_REPORTS = this.URL + 'generate-reports';
    UPDATE_APPROVAL_DOCUMENT = this.URL + 'update-approval-documents';

    SERVICE_HISTORY(data) {
        return this.URL + 'service-history/' + data.id;
    }
}

export default new Api();
