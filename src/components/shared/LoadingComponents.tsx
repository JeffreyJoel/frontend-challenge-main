import { Skeleton } from "../ui/skeleton";
import {Card, CardContent} from "../ui/card";

export function ProfileCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <Skeleton className="h-32 w-full" />
      <CardContent className="pt-0">
        <div className="flex justify-center -mt-12 mb-4">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="text-center space-y-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-center space-y-1">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}