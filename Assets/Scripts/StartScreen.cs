using UnityEngine;

public class StartScreen : GameScreen {

	[SerializeField] private bool startImmediateInEditor;

	public void Button_Start() {
		GameManager.Instance.Pause(false);
		SetCanvasGroupActive(false);
	}

	protected override void Awake() {
		base.Awake();
#if UNITY_EDITOR
		if (startImmediateInEditor) {
			GameManager.Instance.Pause(false);
			SetCanvasGroupActive(false);
			return;
		}
#endif
		GameManager.Instance.Pause(true);
		SetCanvasGroupActive(true);
	}

}