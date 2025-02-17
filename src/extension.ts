import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "otak-restart" is now active');

    // ステータスバーアイテムの作成
    setupStatusBarItem(context);

    // コマンドの登録とイベントリスナーの設定
    const disposables = [
        vscode.commands.registerCommand('otak-restart.showOptions', showRestartOptions)
    ];

    // 設定変更監視
    disposables.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('otakRestart')) {
                updateStatusBarItem();
            }
        })
    );

    context.subscriptions.push(...disposables);
}

function setupStatusBarItem(context: vscode.ExtensionContext) {
    statusBarItem = createStatusBarItem();
    context.subscriptions.push(statusBarItem);
    updateStatusBarItem();
}

async function showRestartOptions() {
    try {
        const selection = await vscode.window.showWarningMessage(
            'Select an operation to perform:',
            { modal: true },
            'Restart Extension Host',
            'Reload Window'
        );

        if (selection === 'Restart Extension Host') {
            await vscode.commands.executeCommand('workbench.action.restartExtensionHost');
        } else if (selection === 'Reload Window') {
            await vscode.commands.executeCommand('workbench.action.reloadWindow');
        }
    } catch (error) {
        console.error('Error during operation:', error);
        vscode.window.showErrorMessage('An error occurred while performing the operation.');
    }
}

function createStatusBarItem(): vscode.StatusBarItem {
    const config = vscode.workspace.getConfiguration('otakRestart');
    const alignment = config.get('buttonPosition') === 'left' 
        ? vscode.StatusBarAlignment.Left 
        : vscode.StatusBarAlignment.Right;
    
    const item = vscode.window.createStatusBarItem(alignment, 100);
    item.command = 'otak-restart.showOptions';
    const buttonText = config.get<string>('buttonText') || '$(sync) Restart';
    item.text = buttonText;
    item.tooltip = 'Click to show restart menu';
    item.show();
    return item;
}

function updateStatusBarItem() {
    const config = vscode.workspace.getConfiguration('otakRestart');
    statusBarItem.text = config.get<string>('buttonText') || '$(sync) Restart';
    statusBarItem.tooltip = 'Click to show restart menu';
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
