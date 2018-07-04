const db = require('../../database/index');

module.exports = {
  getCities: () => db.knex('applications').distinct('city', 'state').groupBy('state', 'city').select(),
  getStates: () => db.knex('applications').distinct('state').select(),
  //consolidate the two above to one function
  getRoles: () => db.knex('roles').distinct('name').select(),
  calculateAvgSalary: (query) => {
    if (query.city || query.state) {
      console.log(1);

      // find the company id from the company name
      if (query.company) {
        console.log(2);

        return db.knex('companies').where({ name: query.company })
          .then(company => Object.assign({}, { query, company: company[0] }))
          .then(source => db.knex('roles').select().where({ name: source.query.role, company_id: source.company.id })
            .then(roles => Object.assign({}, source, {
              roles: roles.map(role => ({ id: role.id, salary: role.salary, name: role.name })),
            })))
          .then((source) => {
            console.log(source, '2222');
            const roleIds = source.roles.map(role => role.id);
            return db.knex('applications').where({ state: source.query.state, city: source.query.city }).whereIn('role_id', roleIds).then((apps) => {
              const findSalary = (id) => {
                for (let i = 0; i < source.roles.length; i++) {
                  if (source.roles[i].id === id) {
                    return source.roles[i].salary;
                  }
                }
              };

              return apps.map(app => Object.assign({}, app, {
                salary: findSalary(app.role_id),
                company: source.company.name,
                role: source.roles[0].name,
              }));
            });
          })
          .then((source) => {
            console.log(source, '1111');
            if(!source.length){
              throw ('No results found  because we currently do not have enough data. Either add an application to start off this company at this location or come back later.');
            }
            const avgSalary = source.reduce((accumulator, app) => accumulator + app.salary, 0) / source.length;
            return Object.assign({}, {
              avgSalary: Number(avgSalary).toFixed(2),
              numberOfApplications: source.length,
              city: source[0].city,
              state: source[0].state,
              company: source[0].company,
              role: source[0].role,
            });
          })
          .catch(err => err);
      }
      return db.knex('roles').select().where({ name: query.role })
        .then(roles => Object.assign({}, query, {
          roles,
        }))

        .then((source) => {
          const companyIds = [];

          source.roles.forEach((role) => {
            if (!companyIds.includes(role.company_id)) {
              companyIds.push(role.company_id);
            }
          });
          companyIds.forEach((id, index) => db.knex('companies').where({ id }).then(company => companyIds[index] = company[0].name));
          const roleIds = source.roles.map(role => role.id);
          return Object.assign({}, source, { roleIds }, {
            companies: companyIds,
          });
        })
        .then((source) => {
          console.log(source, 'salary');
          return db.knex('applications').where({ state: source.state, city: source.city }).whereIn('role_id', source.roleIds).then((apps) => {
            const findSalary = (id) => {
              for (let i = 0; i < source.roles.length; i++) {
                if (source.roles[i].id === id) {
                  return source.roles[i].salary;
                }
              }
            };

            return Object.assign({}, {
              apps: apps.map(app => Object.assign({}, app, {
                salary: findSalary(app.role_id),
                role: source.roles[0].name,
              })),
            }, { companies: source.companies });
          });
        })
        .then((source) => {
          const avgSalary = source.apps.reduce((accumulator, app) => accumulator + app.salary, 0) / source.apps.length;
          return Object.assign({}, {
            avgSalary: Number(avgSalary).toFixed(2),
            numberOfApplications: source.apps.length,
            city: source.apps[0].city,
            state: source.apps[0].state,
            companies: source.companies,
            role: source.apps[0].role,
          });
        });
    } else if (query.company || query.role) {
      console.log(query, 'ᕙ(⇀‸↼‶)ᕗ');
      if (query.company) {
        if (query.role) {
          return db.knex('companies').where({ name: query.company })
            .then(company => Object.assign({}, query, { company: company[0] }))
            .then(source => db.knex('roles').where({ name: source.role, company_id: source.company.id })
              .then((roles) => {
                const roleIds = roles.map(role => role.id);

                const avgSalary = roles.reduce((accumulator, role) => accumulator + role.salary, 0) / roles.length;
                return Object.assign({}, source, { roles, roleIds, avgSalary: Number(avgSalary).toFixed(2) });
              }))
            .then(source => Object.assign({}, source, {
              locations: db.knex('applications').whereIn('role_id', source.roleIds).distinct('city', 'state').then(apps => apps.map(app => [app.city, app.state])),
            }))
            .then(source => source);
        }
        return db.knex('companies').where({ name: query.company }).then((company) => {

        });
      }
    }
  },
};
