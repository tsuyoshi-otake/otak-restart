import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "otak-restart" is now active');

    // ステータスバーアイテムの作成
    setupStatusBarItem(context);

    // コマンドの登録とイベントリスナーの設定
    const disposables = [
        vscode.commands.registerCommand('otak-restart.restartExtensionHost', () => vscode.commands.executeCommand('workbench.action.restartExtensionHost')),
        vscode.commands.registerCommand('otak-restart.reloadWindow', () => vscode.commands.executeCommand('workbench.action.reloadWindow'))
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

function createStatusBarItem(): vscode.StatusBarItem {
    const config = vscode.workspace.getConfiguration('otakRestart');
    const alignment = config.get('buttonPosition') === 'left' 
        ? vscode.StatusBarAlignment.Left 
        : vscode.StatusBarAlignment.Right;
    
    const item = vscode.window.createStatusBarItem(alignment, 100);
    const buttonText = config.get<string>('buttonText') || '$(sync) Restart';
    item.text = buttonText;

    const tooltip = new vscode.MarkdownString(undefined, true);
    tooltip.appendMarkdown('**Available Operations**\n\n');
    tooltip.appendMarkdown('---\n\n');
    tooltip.appendMarkdown('[$(sync) Restart Extension Host](command:otak-restart.restartExtensionHost "Restart Extension Host")  ');
    tooltip.appendMarkdown('[$(sync) Reload Window](command:otak-restart.reloadWindow "Reload Window")');
    tooltip.isTrusted = true;
    tooltip.supportHtml = true;

    item.tooltip = tooltip;
    item.show();
    return item;
}

async function updateStatusBarItem() {
    const config = vscode.workspace.getConfiguration('otakRestart');
    statusBarItem.text = config.get<string>('buttonText') || '$(sync) Restart';

    const tooltip = new vscode.MarkdownString(undefined, true);
    tooltip.appendMarkdown('Available Operations\n\n');
    tooltip.appendMarkdown('---\n\n');
    tooltip.appendMarkdown('[$(sync) Restart Extension Host](command:otak-restart.restartExtensionHost "Restart Extension Host")  ');
    tooltip.appendMarkdown('[$(sync) Reload Window](command:otak-restart.reloadWindow "Reload Window")');
    tooltip.isTrusted = true;
    tooltip.supportHtml = true;

    statusBarItem.tooltip = tooltip;
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
