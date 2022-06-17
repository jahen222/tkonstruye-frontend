import gql from "graphql-tag";

export const FINDWORK_CREATE_PROPOSAL = gql`
  mutation createProposalMe(
    $ticket: ID!
    $usersPermissionsUser: ID!
    $coverLetter: String!
    $jobDetail: String,
    $file: ID
  ) {
    createProposalMe(
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

export const CREATE_PROPOSAL_SET_PAYMENT_TO_FLOW = gql`
  mutation setpaymentproposalwithflow (
    $userId: ID!, 
    $price: Int!, 
    $coverLetter: String!
    $jobDetail: String,
    $file: ID,
    $ticketId: ID!, 
  ) {
    setpaymentproposalwithflow (
      userId: $userId
      price: $price
      coverLetter: $coverLetter
      jobDetail: $jobDetail
      file: $file
      ticketId: $ticketId
    ) {
      redirect
    }
  }
`;
