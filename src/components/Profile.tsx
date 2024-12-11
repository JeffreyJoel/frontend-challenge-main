"use client"

import { useState } from "react";
import { FunctionComponent } from "react";
import classNames from "classnames";
import { Button } from "@/components/Button";
import { Person } from "@/utils/common/person";
import { useUserDetails } from "@/hooks/useUserProfile";
import { ProfileCard } from "@/components/shared/ProfileCard";
import { ProfileCardSkeleton } from "@/components/shared/LoadingComponents";
import ErrorComponent from "@/components/shared/ErrorComponent";



export const Profile: FunctionComponent = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person>(Person.PersonA);
  
  const { data, isFetching, refetch, isError } = useUserDetails(selectedPerson);

  return (
    <div className="flex flex-col mt-8 justify-center items-center p-4">
      <div className={classNames("flex gap-2 mb-6")}>
        {Object.values(Person).map((person) => (
          <Button 
            key={person}
            onClick={() => setSelectedPerson(person)}
            className={classNames(
              "px-4 py-2 rounded-lg",
              selectedPerson === person 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-black"
            )}
          >
            {person}
          </Button>
        ))}
      </div>
      
      <div className="w-full max-w-md">
        <div className="max-w-sm mx-auto">
        {isError && 
          <ErrorComponent message="Error fetching user details" refetch={refetch}/>
        }
        {isFetching && <ProfileCardSkeleton/>}
        {data && (
          <div className="animate-fade-in ">
            <ProfileCard user={data} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};