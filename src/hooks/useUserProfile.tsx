"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Person, User } from '../utils/common/person';


const fetchUserDetails = async (person: Person): Promise<User | null> => {
    const { data } = await axios.get(`/api/person`, {
      params: { person: person }
    });
    return data;
  };

  export const useUserDetails = (personType?: Person) => {
    return useQuery<User| null, Error>({
      queryKey: ['userDetails', personType],
      queryFn: () => fetchUserDetails(personType!),
      enabled: !!personType,
      retry: 3,
    //   onError: (error) => {
    //     console.error('Failed to fetch user details:', error);
    //   }
    });
  };
