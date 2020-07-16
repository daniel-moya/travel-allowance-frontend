import { observable, action, decorate, computed } from 'mobx';
import allowance from '../api/allowance';
import { valuesBetween } from '../utils/math';
import { monthBussinessDays, nextMonth } from '../utils/date';
import moment from 'moment';

class AllowanceStore {
  compensationRate = {};

  allowanceData = [];

  loading = false;

  getAllowanceData = () => {
    this.loading = true;
    return allowance
      .getAllowance()
      .then((res) => {
        this.loading = false;
        this.allowanceData = res.data;
      })
      .catch((err) => {
        this.loading = false;
      });
  };

  get dataLength() {
    return this.allowanceData.length;
  }

  calculateEmployeeCompensation = () => {
    this.loading = true;
    allowance
      .getCompensationRate()
      .then((res) => {
        this.loading = false;
        this.compensationRate = res.data;
        this.allowanceData.map(employee => {
          const { distance, workdays } = employee;

          // Selecting allowance compensation rate according to employee transport
          let customRate = this.compensationRate.filter(transportRate => transportRate.name === employee.transport.toLowerCase());
          let totalRate = customRate[0].base_compensation_per_km;


          // Check for distances range exceptions
          if (customRate[0].exceptions.length > 0) {
            const { min_km, max_km } = customRate[0].exceptions[0];
            if (valuesBetween(employee.distance, min_km, max_km)) totalRate *= 2;
          }

          const bussinessDays = monthBussinessDays();
          const weeks = Math.round(bussinessDays / 7) + 1;



          const workedDays = 4;
          const unworkedDays = 5 - employee.workdays;
          const unworkedMonth = unworkedDays * weeks;
          const workedMonth = bussinessDays - unworkedMonth - 1;

          const totalDistance = (distance * 2) * weeks;

          // Calculate Allowance Price per week
          const result = totalRate * totalDistance * workedMonth;

          employee.paymentDate = nextMonth();

          return employee.compensation = result;
        })
      })
      .catch((err) => {
        this.loading = false;
      });
  };
}

decorate(AllowanceStore, {
  allowanceData: observable,
  getAllowanceData: action,
  compensationRate: observable,
  calculateEmployeeCompensation: action,
  dataLength: computed,
});

const allowanceStore = new AllowanceStore();

export default allowanceStore;
