import base from './base';

class Allowance {
  getAllowance = (params) =>
    base.get('/allowance', params).then(({ data }) => data);

  getAllowancePerEmployee = (params) =>
    base.get('/allowance/employee', params).then(({ data }) => data);

  getCompensationRate = (params) =>
    base.get_custom('https://api.staging.yeshugo.com/applicant/travel_types', params).then((data) => data);
}

export default new Allowance();