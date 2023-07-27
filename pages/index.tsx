import { CreateTreeForm } from "@/components/create-tree-form"
import { Typography } from "@/components/ui/typography"
import Services from "@/components/Services"
import Welcome from "@/components/Welcome"



export default function HomePage() {
  return (
    <>
      <div className="mb-10">
      <Welcome /> 
        <Typography as="h4" level="h6" className="mb-2 font-bold">
                    
        </Typography>
      </div>
      <Services />
    </>
  )
}
