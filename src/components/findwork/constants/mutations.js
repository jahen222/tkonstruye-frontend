import gql from "graphql-tag";

export const FINDWORK_CREATE_PROPOSAL = gql`
  mutation createProposal(
    $ticket: ID!
    $usersPermissionsUser: ID!
    $coverLetter: String!
    $jobDetail: String
  ) {
    createProposal(
      input: {
        data: {
          ticket: $ticket
          users_permissions_user: $usersPermissionsUser
          coverLetter: $coverLetter
          jobDetail: $jobDetail
        }
      }
    ) {
      proposal {
        id
      }
    }
  }
`;
