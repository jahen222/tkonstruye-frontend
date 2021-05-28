import gql from "graphql-tag";

export const FINDWORK_CREATE_PROPOSAL = gql`
  mutation createProposal(
    $ticket: ID!
    $usersPermissionsUser: ID!
    $coverLetter: String!
    $jobDetail: String,
    $file: ID
  ) {
    createProposal(
      input: {
        data: {
          ticket: $ticket
          users_permissions_user: $usersPermissionsUser
          coverLetter: $coverLetter
          jobDetail: $jobDetail
          file: $file
        }
      }
    ) {
      proposal {
        id
      }
    }
  }
`;

export const FINDWORK_UPLOAD_PHOTO = gql`
  mutation upload($file: Upload!) {
    upload(file: $file) {
      id
      name
    }
  }
`;
