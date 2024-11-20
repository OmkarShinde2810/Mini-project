class ApiError extends Error{
    constructor(status,messages="something wents wrong",error=[]){
       super(messages)
       this.status=status
       this.messages=messages
       this.data=null
       this.success=false
       this.error=error

    }

};

export default ApiError