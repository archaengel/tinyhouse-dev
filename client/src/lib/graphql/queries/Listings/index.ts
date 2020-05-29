import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings(
    $location: String
    $filter: ListingsFilter!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, filter: $filter, page: $page, limit: $limit) {
      region
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`;
