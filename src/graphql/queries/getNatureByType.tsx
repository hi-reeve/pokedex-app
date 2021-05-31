import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_NATURE_BY_TYPE = gql`
    query {
        nature(nature: String!) {
            response
        }
    }
`;
export type GetNatureTypeVariable = {
    nature: string;
};
export const getNatureByType = (variable: GetNatureTypeVariable) => {
    const { data, loading, error } = useQuery<{ response: object }>(
        GET_NATURE_BY_TYPE,
        {
            variables: {
                nature: variable,
            },
        }
    );
    return {
        data,
        loading,
        error,
    };
};
