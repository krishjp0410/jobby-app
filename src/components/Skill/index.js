import './index.css'

const Skill = props => {
  const {skill} = props
  const {imageUrl, name} = skill

  return (
    <li className="skill-list-item">
      <img className="skill-image" src={imageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skill
