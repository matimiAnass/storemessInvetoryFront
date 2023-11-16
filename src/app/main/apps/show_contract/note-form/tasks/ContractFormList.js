import List from '@mui/material/List';
import ContractFormAddListItem from './ContractFormAddListItem';
import ContractFormListItem from './ContractFormListItem';

function ContractFormList(props) {
  function handleListItemChange(item) {
    props.onCheckListChange(props.tasks.map((_item) => (_item.id === item.id ? item : _item)));
  }

  function handleListItemRemove(id) {
    props.onCheckListChange(props.tasks.filter((_item) => _item.id !== id));
  }

  function handleListItemAdd(item) {
    props.onCheckListChange([...props.tasks, item]);
  }

  if (!props.tasks) {
    return null;
  }

  return (
    <div className={props.className}>
      <List dense>
        {props.tasks.map((item) => (
          <ContractFormListItem
            item={item}
            key={item.id}
            onListItemChange={handleListItemChange}
            onListItemRemove={handleListItemRemove}
          />
        ))}
        <ContractFormAddListItem onListItemAdd={handleListItemAdd} />
      </List>
    </div>
  );
}

export default ContractFormList;
