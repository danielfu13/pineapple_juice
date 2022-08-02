import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseList = ({
  exercises,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!exercises.length) {
    return <h3>No Exercises Added</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {exercises &&
        exercises.map((exercise) => (
          <div key={exercise._id} className="card mb-3">
            <h4 className="card-header bg-cardheader  text-gray p-0 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${exercise.exerciseUser}`}
                >
                  {exercise.exerciseUser} <br />
                  <span style={{ fontSize: '1rem' }}>
                   added this exercise on {exercise.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {exercise.createdAt}
                  </span>
                </>
              )}
                <p>{exercise.exerciseDesc}</p>
                <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/exercises/${exercise._id}`}
            >
              See suggestions and tips for this workout.
            </Link>
            </h4>
                       
          </div>
        ))}
    </div>
  );
};

export default ExerciseList;
