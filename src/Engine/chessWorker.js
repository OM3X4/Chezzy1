/*eslint-disable*/
import { engine } from "./EngineKO7";


onmessage = function(message)
{
    const result = engine(message.data[0] , message.data[1] , message.data[2])
    this.self.postMessage(result)
}