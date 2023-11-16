import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function ContractListItemModel(data) {
  data = data || {};

  return _.defaults(data, {
    id: FuseUtils.generateGUID(),
    content: '',
    completed: false,
  });
}

export default ContractListItemModel;
