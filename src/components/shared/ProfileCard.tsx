import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from '@/utils/common/person';


interface UserCardProps {
  user: User;
}

export function ProfileCard({ user }: UserCardProps) {
  return (
    <Card className="w-full max-w-sm cursor-pointer hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 overflow-hidden">
      <div className="relative h-32">
        <Image
          src={user.backgroundImageUrl}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="pt-0">
        <div className="flex justify-center -mt-12 mb-4">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={user.profilePictureUrl} className='object-cover object-center' alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.title}</p>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="text-center">
            <p className="text-xl font-semibold">{user.followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold">{user.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

