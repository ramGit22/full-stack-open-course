import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  const calculateTotal = (parts) => {
    return parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0
    );
  };

  return (
    <>
      <div>
        <h1>Web development curriculum</h1>
        {courses.map((course) => (
          <div key={course.id}>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total total={calculateTotal(course.parts)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Course;
