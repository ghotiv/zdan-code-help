"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {
    provideCompletionItems(document, position, token, context) {
        // a simple completion item which inserts `Hello World!`
        const simpleCompletion = new vscode.CompletionItem('Hello World!');
        // a completion item that inserts its text as snippet,
        // the `insertText`-property is a `SnippetString` which will be
        // honored by the editor.
        const snippetCompletion = new vscode.CompletionItem('Good part of the day');
        snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
        const docs = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
        snippetCompletion.documentation = docs;
        docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');
        // a completion item that can be accepted by a commit character,
        // the `commitCharacters`-property is set which means that the completion will
        // be inserted and then the character will be typed.
        const commitCharacterCompletion = new vscode.CompletionItem('console');
        commitCharacterCompletion.commitCharacters = ['.'];
        commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');
        // a completion item that retriggers IntelliSense when being accepted,
        // the `command`-property is set which the editor will execute after 
        // completion has been inserted. Also, the `insertText` is set so that 
        // a space is inserted after `new`
        const commandCompletion = new vscode.CompletionItem('new');
        commandCompletion.kind = vscode.CompletionItemKind.Keyword;
        commandCompletion.insertText = 'new ';
        commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
        // return all completion items as array
        return [
            simpleCompletion,
            snippetCompletion,
            commitCharacterCompletion,
            commandCompletion
        ];
    }
});
// 把这个数据结构转换为 Provider 数组
const completionArr = [
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "selfApi",
        items: [
            {
                label: "api",
                items: [
                    {
                        label: "Context",
                        kind: vscode.CompletionItemKind.Variable,
                        items: [
                            {
                                label: "getActiveUser",
                                kind: vscode.CompletionItemKind.Function,
                                items: [
                                    {
                                        label: "getUserInfo",
                                        kind: vscode.CompletionItemKind.Function,
                                    },
                                ],
                            },
                            {
                                label: "getUserAgent",
                                kind: vscode.CompletionItemKind.Function,
                            },
                            {
                                label: "getLocaleLang",
                                kind: vscode.CompletionItemKind.Function,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "window",
        items: [
            {
                label: "init",
                kind: vscode.CompletionItemKind.Variable,
            },
        ],
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "authorization",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "setTitleBarConfig",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "setTitleBack",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "setTitle",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "saveParams",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getParams",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "finishWindow",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "ZDANToast",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "dialog",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "uploadMultipleFiles",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "downloadMultipleFile",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "downloadMultipleFile",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getSelectPicPath",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getCameraOrPicPath",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "fileDynamicManager",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getCameraOrPicPath",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getCameraQrResult",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "callTel",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "zdanpay",
        items: []
    },
    {
        selector: ["typescript", "javascript", "plaintext"],
        label: "getBalance",
        items: []
    },
];
const provider3 = vscode.languages.registerCompletionItemProvider('plaintext', {
    provideCompletionItems(document, position, token, context) {
        // const keyWordList:string[] = ["aa","bb","cc"];
        const itemList = [];
        for (const k of completionArr) {
            // console.log(k);
            const simpleCompletion = new vscode.CompletionItem(k.label);
            itemList.push(simpleCompletion);
        }
        return itemList;
        // const simpleCompletion = new vscode.CompletionItem('Hello World!');
        // // return all completion items as array
        // return [
        // 	simpleCompletion
        // ];
    }
});
const providerList = [];
const getProviders = (CompletionItemArr) => {
    CompletionItemArr.forEach((CompletionItem) => {
        const completion = providerFactory(CompletionItem);
        providerList.push(completion);
        if (CompletionItem.items) {
            CompletionItem.items.forEach((item) => {
                const middle = (CompletionItem?.kind === vscode.CompletionItemKind.Function
                    ? "()"
                    : "") + ".";
                item.prefix = CompletionItem.label + middle + item.label;
                item.selector = CompletionItem.selector;
            });
            getProviders(CompletionItem.items);
        }
    });
    return providerList;
};
const providerFactory = (completionItem) => {
    const { selector = [], label, items, prefix = "", kind } = completionItem;
    return vscode.languages.registerCompletionItemProvider(selector, {
        provideCompletionItems(document, position) {
            const linePrefix = document
                .lineAt(position)
                .text.substr(0, position.character);
            // function 的匹配规则可以使用正则来匹配包含参数的情况
            const endsStr = `${label}${kind === vscode.CompletionItemKind.Function ? "()" : ""}.`;
            if (!items || !linePrefix.endsWith(endsStr)) {
                return undefined;
            }
            const completionItems = items.map(({ label, kind, documentation = "" }) => {
                const completion = new vscode.CompletionItem(label, kind);
                completion.documentation = documentation;
                return completion;
            });
            return completionItems;
        },
    }, ".");
};
function activate(context) {
    const providers = getProviders(completionArr);
    context.subscriptions.push(...providers);
    context.subscriptions.push(provider1);
    context.subscriptions.push(provider3);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map