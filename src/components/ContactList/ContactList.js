import PropTypes from 'prop-types';


import { Contact } from "components/Contact/Contact";
import { List } from "./ContactList.styled";




export const ContactList = ({items, onDeleteItem}) =>(



<ul>{items.map((item, id)=>
<List key={id}>

<Contact contact = {item} DeleteItem ={onDeleteItem}/>
</List>
          )}    
</ul>
   


)


ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};