const Part = (props) => {
  return (
    <div>
      {`${props.part[0].name} ${props.part[0].exercises}`} <br />
      {`${props.part[1].name} ${props.part[1].exercises}`} <br />
      {`${props.part[2].name} ${props.part[2].exercises}`} <br />
    </div>
  );
};

export default Part;
