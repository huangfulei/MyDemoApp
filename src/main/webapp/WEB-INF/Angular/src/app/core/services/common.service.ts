import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIUrlConstants} from "../../shared/constants/APIUrlConstants";
import {AppInjector} from "./app-injector";
import {BaseModel} from "../../shared/model/base-model";
import {map} from "rxjs/operators";
import {isNotNull, isNull} from "../../shared/utility/common.utility";
import {SharedConstants} from "../../shared/constants/SharedConstants";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private injector = AppInjector.getInjector();
    protected readonly http = this.injector.get(HttpClient);
    private apiEndpoint: string;
    private modelName: string;

    protected setModelName(modelName: string) {
        this.modelName = modelName;
    }

    protected setApiEndpoint(apiEndpoint: string) {
        this.apiEndpoint = apiEndpoint;
    }

    public search(model?: any): Observable<any> {
        const url = this.apiEndpoint + APIUrlConstants.HTTP_SEARCH;

        let baseModel = {};
        if(isNotNull(model)){
            baseModel = model;
        }
        return this.http.post(url, baseModel).pipe(
            map(response => {

                console.log(response);
                let outModel: BaseModel = new BaseModel();

                /*                // Processes all the messages from the response, this function will return true if there are no error messages
                                // Expected variables are already hard coded in the message service
                                if (this.messageService.processMessage(response, messageSuppression)) {
                                    if (isNotNull(response[SharedConstant.RESULT_LIST_PARAMETER])) {
                                        outModel.resultList = response[SharedConstant.RESULT_LIST_PARAMETER];
                                        // Has a Data Element in the Model?  This is mainly used for angular mock web api
                                    } else if (isNotNull(response[SharedConstant.DATA_LIST_PARAMETER])) {
                                        outModel.resultList = response[SharedConstant.DATA_LIST_PARAMETER];
                                        // If neither just map model for model
                                    } else {
                                        outModel = response;
                                    }
                                    outModel.paging = response[SharedConstant.PAGING_PARAMETER];
                                }
                                this.toggleLoading();*/
                if (isNotNull(response[SharedConstants.RESULT_LIST])) {
                    outModel.resultList = response[SharedConstants.RESULT_LIST];
                    // Has a Data Element in the Model?  This is mainly used for angular mock web api
                } else {
                    outModel = response;
                }
                return outModel;
            }))/*,
            // TODO is there some reason '), )' is used at the end of this line?
            //  If not, remove it here and all other places
            catchError(error => {
                console.log(error);
            }));*/
    }
}
