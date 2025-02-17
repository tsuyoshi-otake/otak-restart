import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
    console.log('拡張機能 "otak-restart" が有効化されました。');

    // ステータスバーアイテムの作成
    statusBarItem = createStatusBarItem();
    context.subscriptions.push(statusBarItem);

    // コマンドの登録
    const restartCommand = vscode.commands.registerCommand('otak-restart.restartExtensionHost', async () => {
        try {
            // 確認ダイアログを表示
            const answer = await vscode.window.showWarningMessage(
                '拡張機能ホストを再起動しますか？',
                { modal: true },
                '再起動'
            );

            if (answer === '再起動') {
                await vscode.commands.executeCommand('workbench.action.restartExtensionHost');
                vscode.window.showInformationMessage('拡張機能ホストを再起動しました。');
            }
        } catch (error) {
            console.error('再起動中にエラーが発生しました:', error);
            vscode.window.showErrorMessage('拡張機能ホストの再起動中にエラーが発生しました。');
        }
    });
    context.subscriptions.push(restartCommand);

    // 設定変更のイベントリスナー
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('otak-restart')) {
                updateStatusBarItem();
            }
        })
    );
}

function createStatusBarItem(): vscode.StatusBarItem {
    const config = vscode.workspace.getConfiguration('otak-restart');
    const alignment = config.get('buttonPosition') === 'left' 
        ? vscode.StatusBarAlignment.Left 
        : vscode.StatusBarAlignment.Right;

    const item = vscode.window.createStatusBarItem(alignment, 100);
    item.command = 'otak-restart.restartExtensionHost';
    updateStatusBarItem();
    item.show();
    return item;
}

function updateStatusBarItem() {
    const config = vscode.workspace.getConfiguration('otak-restart');
    statusBarItem.text = config.get('buttonText') || '$(sync) 再起動';
    statusBarItem.tooltip = '拡張機能ホストを再起動';
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}
