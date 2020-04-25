using UnityEngine;

[RequireComponent(typeof(CanvasGroup))]
public class GameScreen : MonoBehaviour {

	private CanvasGroup canvasGroup;

	protected virtual void Awake() {
		canvasGroup = GetComponent<CanvasGroup>();
		SetCanvasGroupActive(false);
	}

	protected void SetCanvasGroupActive(bool active) {
		canvasGroup.alpha = active ? 1f : 0f;
		canvasGroup.blocksRaycasts = active;
		canvasGroup.interactable = active;
	}

}