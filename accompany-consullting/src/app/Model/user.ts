    export class User{
        id: number;
      role: string;
      userName: string;
      normalizedUserName: string;
      email: string;
      normalizedEmail: string;
      emailConfirmed: boolean;
      passwordHash: string;
      securityStamp: string;
      concurrencyStamp: string;
      twoFactorEnabled: boolean;
      lockoutEnd: Date;
      lockoutEnabled: boolean;
      accessFailedCount: number;
            
        
       
    

    constructor() {
     
    }
   
}