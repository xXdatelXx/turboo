import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let keysPressed: number = Number(context.globalState.get('keysPressed')) || 0;

	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBar.text = `Keys pressed: ${keysPressed}`;
	statusBar.show();

	const keyPressEvent = vscode.workspace.onDidChangeTextDocument(() => {
		keysPressed++;
		statusBar.text = `Keys pressed: ${keysPressed}`;
	});

	const saveEvenet = vscode.workspace.onWillSaveTextDocument(() => {
		context.globalState.update('keysPressed', keysPressed);
	});

	context.subscriptions.push(keyPressEvent);
	context.subscriptions.push(saveEvenet);
}