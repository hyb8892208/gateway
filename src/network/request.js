export function request() {
    const instance = new urn_ast_AST_wsdl_ASTPortType()
    let _protocol = window.location.protocol
    let url_host = window.location.host
    instance.url = _protocol+'//'+url_host+'/proxy'

    return instance
}