import { Button, Info} from "./Contact.styled"
import PropTypes from 'prop-types';

export const Contact  = ({contact: {id, name, number},DeleteItem }) =>(
<>
            <Info>{name}: {number}</Info>
            <Button
          type="button"
          className="TodoList__btn"
          onClick={() => DeleteItem(id)}
        >
          Удалить
        </Button>
        </>
)


Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number:PropTypes.string.isRequired,
  }).isRequired,
  DeleteItem: PropTypes.func.isRequired,
}