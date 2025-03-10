import './CardUser.css'
import PropTypes from "prop-types";

export default function CardUser({ user }) {
    return (
        <div className='card-user' >
            <div className='blue-box-user'>
                <h4>{user.name.charAt(0) || 'A'}</h4>
            </div>
            <div className='text-user-data'>
                <h2>{user.name}</h2>
                <h5 className='m-0'>{user.email}</h5>
            </div>
        </div>
    )
}

CardUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    }).isRequired,
}