import * as admin from "firebase-admin";
import { FirestoreRoles } from "firestore-roles";
import { Container } from "inversify";

import { AddAdviceFunctionFactory } from "./functions/addadvice/AddAdviceFunctionFactory";
import { ImportAdviceToUserFunctionFactory } from "./functions/importadvicetouser/ImportAdviceToUserFunctionFactory";
import { SendSMSFunctionFactory } from "./functions/sendsms/SendSMSFunctionFactory";
import { AuthHelper } from "./helpers/AuthHelper";
import { AuthHelperImpl } from "./helpers/AuthHelperImpl";
import firebaseAppFactory from "./providers/FirebaseAppFactory";
import firestoreRolesProvider from "./providers/FirestoreRolesFactory";
import { RateLimiterFactory } from "./providers/RateLimiterFactory";
import TYPES from "./TYPES";

function containerFactory() {
    const container = new Container();
    container.bind<admin.app.App>(TYPES.FirebaseAdminApp).toDynamicValue(firebaseAppFactory);
    container
        .bind<admin.firestore.Firestore>(TYPES.Firestore)
        .toDynamicValue(context => context.container.get<admin.app.App>(TYPES.FirebaseAdminApp).firestore())
        .inSingletonScope();
    container
        .bind<admin.database.Database>(TYPES.RealtimeDatabase)
        .toDynamicValue(context => context.container.get<admin.app.App>(TYPES.FirebaseAdminApp).database())
        .inSingletonScope();
    container
        .bind<FirestoreRoles>(TYPES.FirestoreRoles)
        .toDynamicValue(firestoreRolesProvider)
        .inSingletonScope();
    container.bind<AuthHelper>(TYPES.AuthHelper).to(AuthHelperImpl);
    container.bind<RateLimiterFactory>(TYPES.RateLimiterFactory).to(RateLimiterFactory);
    container.bind<AddAdviceFunctionFactory>(TYPES.AddAdviceFunctionFactory).to(AddAdviceFunctionFactory);
    container
        .bind<ImportAdviceToUserFunctionFactory>(TYPES.ImportAdviceToUserFunctionFactory)
        .to(ImportAdviceToUserFunctionFactory);
    container.bind<SendSMSFunctionFactory>(TYPES.SendSMSFunctionFactory).to(SendSMSFunctionFactory);

    return container;
}
export default containerFactory;