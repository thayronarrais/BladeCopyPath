const vscode = require('vscode');
const path = require('path');

function activate(context) {
	let disposable = vscode.commands.registerCommand('bladecopypath.editor', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const filePath = editor.document.uri.fsPath;
        const relativePath = path.relative(vscode.workspace.rootPath, filePath);
        const cleanedPath = cleanPath(relativePath);
        console.log('Modified Blade Path:', cleanedPath);

        vscode.env.clipboard.writeText(cleanedPath).then(() => {
            vscode.window.showInformationMessage('Blade path copied to clipboard.');
        }, (err) => {
            vscode.window.showErrorMessage(`Failed to copy blade path: ${err}`);
        });
    });


	let disposable2 = vscode.commands.registerCommand('bladecopypath.title', function (uri) {
        if (!uri) {
            vscode.window.showErrorMessage('No file selected.');
            return;
        }

        const filePath = uri.fsPath;
        const relativePath = path.relative(vscode.workspace.rootPath, filePath);
        const cleanedPath = cleanPath(relativePath);
        console.log('Modified Blade Path:', cleanedPath);

        vscode.env.clipboard.writeText(cleanedPath).then(() => {
            vscode.window.showInformationMessage('Blade path copied to clipboard.');
        }, (err) => {
            vscode.window.showErrorMessage(`Failed to copy blade path: ${err}`);
        });
    });
	
    context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

function cleanPath(filePath) {
    // Remove 'resources\views\' from the beginning of the path
    let cleanedPath = filePath.replace(/^resources\\views\\/, '');

    // Remove '.blade.php' from the end of the file name
    cleanedPath = cleanedPath.replace(/\.blade\.php$/, '');

    // Replace remaining backslashes with dots
    cleanedPath = cleanedPath.replace(/\\/g, '.');

    return cleanedPath;
}

module.exports = {
    activate,
    deactivate
};
