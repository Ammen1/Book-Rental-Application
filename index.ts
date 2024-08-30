
function Spilt(target: any, propertKey: string, descriptor: Property)

class StringManager {
    @Spilt
    print(str: string) {
        console.log(str)
    }
}

const stringManager = new StringManager()
stringManager.print("hello")