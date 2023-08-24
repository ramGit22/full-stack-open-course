import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  const calculateTotal = (parts) => {
    return parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    );
  };
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={calculateTotal(course.parts)} />
    </div>
  );
};

export default Course;
