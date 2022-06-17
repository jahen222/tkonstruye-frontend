import gql from "graphql-tag";

export const SUBSCRIPTIONS_SET_USER = gql`
  mutation setsubscriptiontouser(
        $userId: ID!
        $subscriptionId: ID!
    ) 
    {
        setsubscriptiontouser(
            userId: $userId
            subscriptionId: $subscriptionId
        ) 
        {
            users_permissions_user{
                id
                balance
                subscription{
                    name
                }
            }
        }
    }
`;

export const CREATE_SUBSCRIPTION_SET_PAYMENT_TO_FLOW = gql`
  mutation setpaymentsubscriptionwithflow(
        $userId: ID!
        $subscriptionId: ID!
    ) 
    {
        setpaymentsubscriptionwithflow(
            userId: $userId
            subscriptionId: $subscriptionId
        ) 
        {
            redirect
        }
    }
`;

