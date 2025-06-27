import { Play } from 'lucide-react'

export const HeroSection = () => {
  return (
    <div className="text-white flex justify-between gap-16">
      <div className="w-2/5 flex flex-col gap-4 justify-between mb-8">
        <div className="font-montserrat font-extrabold text-[48px]">
          Finally, an on-demand delivery system for tourist & locals alike.
        </div>
        <div>
          Maximize productivity and save time with our revolutionary approach.
          Deliver improved performance and better team coordination. (Not done)
        </div>
        <div className="flex space-x-4 rounded-md">
          <div className="p-2 bg-[#6E31DE] rounded-md">Open To</div>
          <div className="flex text-white border-white border-2 rounded-md p-2">
            <Play className="" />
            <div>See how it works</div>
          </div>
        </div>
      </div>
      <div className="w-3/5">
        <img className="w-full" alt="" src="/images/dummy.png" />
      </div>
    </div>
  )
}
