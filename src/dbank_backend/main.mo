import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";




actor DBank {
    
    stable var currentValue: Float = 300;
    
    stable var startTime = Time.now();

   Debug.print( debug_show( startTime ));

    public func topUp( amount : Float ) : async Float {
        currentValue += amount;
        return currentValue;
    };

    public func withDrawl( amount : Float ) : async Float {
        if ( amount > currentValue ) {
            Debug.print(" Amount to large, currentValue less than zero ");
            return amount;
        };
        currentValue -= amount;
        return currentValue;
    };

    public query func checkBalance() : async Float {
        return currentValue;
    };

    public func compound() {
        let currentTime = Time.now();
        let timeElapsedNS = currentTime - startTime;
        let timeElapsedS = timeElapsedNS / 1000000000;
        currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
        startTime := currentTime;
    }
}