import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import mock from '../mock';

let contractTypesDB = mockApi.components.examples.planPermissions.value;


mock.onGet('/api/planPermissions').reply((config) => {
  return [200, contractTypesDB];
});
mock.onDelete('/api/planPermissions').reply(({ data }) => {
  const ids = JSON.parse(data);
  contractTypesDB = contractTypesDB.filter((item) => ids.includes(item.id));

  return [200, contractTypesDB];
});


// mock.onPost('/api/ecommerce/products').reply(({ data }) => {
//   const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
//
//   contractTypesDB.push(newProduct);
//
//   return [200, newProduct];
// });
//

// mock.onGet(/\/api\/ecommerce\/products\/[^/]+/).reply(({ url, data }) => {
//   const { id } = url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;
//
//   return [200, _.find(contractTypesDB, { id })];
// });
//
// mock.onPut(/\/api\/ecommerce\/products\/[^/]+/).reply(({ url, data }) => {
//   const { id } = url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;
//
//   _.assign(_.find(contractTypesDB, { id }), JSON.parse(data));
//
//   return [200, _.find(contractTypesDB, { id })];
// });
//
// mock.onDelete(/\/api\/ecommerce\/products\/[^/]+/).reply((config) => {
//   const { id } = config.url.match(/\/api\/ecommerce\/products\/(?<id>[^/]+)/).groups;
//
//   _.remove(contractTypesDB, { id });
//
//   return [200, id];
// });
//
