import { isTaskJobStatus, isTaskType, TaskJobStatus, TaskType } from "./MessageToChildTypes"
import validateObject, { isArrayOf, isEqualTo, isJSONObject, isNull, isOneOf, isString, JSONObject, optional } from "./validateObject"

// getFigureData

export type GetFigureDataRequest = {
    type: 'getFigureData'
}

export const isGetFigureDataRequest = (x: any): x is GetFigureDataRequest => {
    return validateObject(x, {
        type: isEqualTo('getFigureData')
    })
}

export type GetFigureDataResponse = {
    type: 'getFigureData'
    figureData: any
}

export const isGetFigureDataResponse = (x: any): x is GetFigureDataResponse => {
    return validateObject(x, {
        type: isEqualTo('getFigureData'),
        figureData: () => (true)
    })
}

// getFileData

export type GetFileDataRequest = {
    type: 'getFileData'
    uri: string
}

export const isGetFileDataRequest = (x: any): x is GetFileDataRequest => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        uri: optional(isString)
    })
}

export type GetFileDataResponse = {
    type: 'getFileData'
    fileData: any
}

export const isGetFileDataResponse = (x: any): x is GetFileDataResponse => {
    return validateObject(x, {
        type: isEqualTo('getFileData'),
        fileData: () => (true)
    })
}

// getMutable

export type GetMutableRequest = {
    type: 'getMutable'
    key: string
}

export const isGetMutableRequest = (x: any): x is GetMutableRequest => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        key: isString
    })
}

export type GetMutableResponse = {
    type: 'getMutable'
    value: string | null
}

export const isGetMutableResponse = (x: any): x is GetMutableResponse => {
    return validateObject(x, {
        type: isEqualTo('getMutable'),
        value: isOneOf([isNull, isString])
    })
}

// initiateTask

export type InitiateTaskRequest = {
    type: 'initiateTask'
    taskName: string
    taskInput: {[key: string]: any}
    taskType: TaskType
}

export const isInitiateTaskRequest = (x: any): x is InitiateTaskRequest => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskName: isString,
        taskInput: () => (true),
        taskType: isTaskType
    })
}

export type InitiateTaskResponse = {
    type: 'initiateTask'
    taskJobId: string
    status: TaskJobStatus
    errorMessage?: string // for status=error
    returnValue?: any // for status=finished
}

export const isInitiateTaskResponse = (x: any): x is InitiateTaskResponse => {
    return validateObject(x, {
        type: isEqualTo('initiateTask'),
        taskJobId: isString,
        status: isTaskJobStatus,
        errorMessage: optional(isString),
        returnValue: optional(() => (true))
    })
}

// subscribeToFeed

export type SubscribeToFeedRequest = {
    type: 'subscribeToFeed'
    feedId: string
}

export const isSubscribeToFeedRequest = (x: any): x is SubscribeToFeedRequest => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        feedId: isString
    })
}

export type SubscribeToFeedResponse = {
    type: 'subscribeToFeed'
    messages: JSONObject[]
}

export const isSubscribeToFeedResponse = (x: any): x is SubscribeToFeedResponse => {
    return validateObject(x, {
        type: isEqualTo('subscribeToFeed'),
        messages: isArrayOf(isJSONObject)
    })
}

//////////////////////////////////////////////////////////////

export type FigurlRequest =
    GetFigureDataRequest |
    GetFileDataRequest |
    GetMutableRequest |
    InitiateTaskRequest |
    SubscribeToFeedRequest

export const isFigurlRequest = (x: any): x is FigurlRequest => {
    return isOneOf([
        isGetFigureDataRequest,
        isGetFileDataRequest,
        isGetMutableRequest,
        isInitiateTaskRequest,
        isSubscribeToFeedRequest
    ])(x)
}

export type FigurlResponse =
    GetFigureDataResponse |
    GetFileDataResponse |
    GetMutableResponse |
    InitiateTaskResponse |
    SubscribeToFeedResponse

export const isFigurlResponse = (x: any): x is FigurlResponse => {
    return isOneOf([
        isGetFigureDataResponse,
        isGetFileDataResponse,
        isGetMutableResponse,
        isInitiateTaskResponse,
        isSubscribeToFeedResponse
    ])(x)
}