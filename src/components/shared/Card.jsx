import PropTypes from 'prop-types'
// Card component for UI, takes in two props, children which is a node to be displayed, and reverse which
// determines if the card shpould be light mode or dark mode.
function Card({ children, reverse }) {
  
  return (
    <div className={`card ${reverse ? 'reverse' : ''}`}>{ children }</div>
  )
  // return (
  //   <div className="card" style = {{backgroundColor: reverse ? 'rgba(0, 0, 0, 0.4)': '#fff', color: reverse ? '#fff': '#333'}}>{ children }</div>
  // )
}
Card.defaultProps = {
  reverse: false
}
Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool
}
export default Card