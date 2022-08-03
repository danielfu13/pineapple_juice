import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_EXERCISE } from '../utils/queries';

const SingleExercise = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { exerciseId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EXERCISE, {
    // pass URL parameter
    variables: { exerciseId: exerciseId },
  });

  const exercise = data?.exercise || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-row flex-start justify-space-between my-3">
     <div>
      <h3 className="card-header text-black p-2 m-0">
        {exercise.exerciseUser} <br />
        <span style={{ fontSize: '1rem' }}>
         {exercise.createdAt}
        </span>
      </h3>
      <div className="py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            lineHeight: '1.5',
          }}
        >
          {exercise.exerciseDesc}
        </blockquote>
      </div>
       </div>
      <div className="mt-0 mb-5">
        <CommentList comments={exercise.comments} />
      </div>
      <div className="col-24 m-3 p-4">
        <CommentForm exerciseId={exercise._id} />
      </div>
    </div>
  );
};

export default SingleExercise;
