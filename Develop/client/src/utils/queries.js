import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username 
      email
      saveBook {
      BookId
      authors
      description
      image
      link
      title
      }
    }
  }
`;
