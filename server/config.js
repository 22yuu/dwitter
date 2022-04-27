import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
    // 사용자가 명시되어 있지 않은 변수를 사용할 수 있기 때문에 유효성 검사를 해주기 위한 함수이다.
    // 이 함수에서는 사용자가 JWT_KEY가 없을 떄 undefined로 처리한다.
    const value = process.env[key] || defaultValue;
    if(value == null) {
        // null 일때도 true, undefined일때도 true
        throw new Error(`Key ${key} is undefiend`);
    }
    return value;
}
export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database:required('DB_DATABASE'),
    }
}

/**
 * dotenv 라이브러리를 통해서 .env config를 작성해준 후 직접 코드에 작성해도 되지만
 * 그렇게 하면 자동완성이 되지 않는다. 예) process.env.JWT_SECRET 를 직접 쳐야함
 * 하지만 이처럼 config 내용을 모듈로 따로 한 번 만들어 두면  이 모듈만 import 시켜주면
 * 자동완성 기능까지 할 수 있어 오타, 에러가 날 확률이 줄어든다.
 * 
 * 또한 공통으로 묶음으로서 코드 가독성 또한 높아진다.
 */