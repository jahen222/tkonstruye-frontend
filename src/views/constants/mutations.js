import gql from "graphql-tag";

export const SUBSCRIPTIONS_SET_USER = gql`
  query setsubscriptiontouser(
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
