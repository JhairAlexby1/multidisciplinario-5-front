import { Graphic } from "../cardGraphic/Graphic"
import { Humidity } from "../cardHumidity/Humidity"
import { Temperature } from "../cardTemperature/Temperature"


export const Main = () => {
  return (
<main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            <Temperature />

            <Humidity />

            <Graphic />
            

            
          </div>
        </div>
      </main> 
       )
}
